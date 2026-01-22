package esprit.tn.projetspring.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Orderr;
import esprit.tn.projetspring.Entity.ShopManag.Promotion;
import esprit.tn.projetspring.Entity.UserManag.User;
import esprit.tn.projetspring.Entity.dto.Shop.PaymentInfo;
import esprit.tn.projetspring.Entity.dto.Shop.PlaceOrderDto;
import esprit.tn.projetspring.Interface.OrderrInterface;
import esprit.tn.projetspring.Repository.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class OrderrService implements OrderrInterface {

    @Autowired
    OrderrRepository orderRepository;

    @Autowired
    CommandLineRepository commandLineRepository;

    @Autowired
    CommandLineService commandLineService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    public void CheckoutServiceImpl(UserRepository userRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.userRepository = userRepository;

        // init Stripe API with secretKey
        Stripe.apiKey = secretKey;
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

        var paymentMethodTypes = new ArrayList<String>(); // Spécifiez le type pour ArrayList

        var params = new HashMap<String, Object>(); // Spécifiez le type pour HashMap
        params.put("amount", paymentInfo.getAmount());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "luv2shop purchase");
       // params.put("receipt_email", paymentInfo.getReceiptEmail());

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent;
    }
    /*@Override
    public Orderr placeOrder(PaymentDetails paymentDetails, Long userId) {
        Orderr order = new Orderr();
        PaymentDetails paymentDetails1 = new PaymentDetails();
        paymentDetailsRepository.save(paymentDetails1);
        List<CommandLine> commandLines = commandLineRepository.findAllByUserIdAndStatusWanted(userId, true);
        order.setLigneCommandes(commandLines);
        order.setDate_commande(LocalDate.now());
        order.setPaymentDetails(paymentDetails);
        for (CommandLine commandLine : commandLines) {
            commandLine.setStatusWanted(false);
            Long id = commandLine.getIdLigneCom();
            commandLineService.updateCommandLine(id, commandLine);
        }
        return orderRepository.save(order);
    }*/

    @Override
    public Orderr placeOrder(PlaceOrderDto placeOrderDto) {
        Orderr order = new Orderr();
        List<CommandLine> commandLines = commandLineRepository.findAllByUserIdAndStatusWanted(2L, true);
        order.setLigneCommandes(commandLines);
        order.setDateCommande(LocalDateTime.now());
        order.setRemise(placeOrderDto.getDiscount());
        order.setTotalPrix(placeOrderDto.getTotal());
        order.setStatusCom(false);
        User user = userRepository.findById(2L).orElse(null);
        order.setUser(user);
        Promotion promotion = new Promotion();
        if (placeOrderDto.getCode()!=null) {
            promotion = promotionRepository.findByCode(placeOrderDto.getCode());
            order.setPromotion(promotion);
        }
        System.out.println(commandLines);
        for (CommandLine commandLine : commandLines) {
            commandLine.setStatusWanted(false);
            System.out.println("hereeeee");
            Long id = commandLine.getIdLigneCom();
            commandLineService.updateCommandLine(id, commandLine);
        }
        return orderRepository.save(order);
    }


    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        return UUID.randomUUID().toString();
    }

    @Override
    public Orderr addOrder (Orderr order, Long userId){
        List<CommandLine> commandLines = commandLineRepository.findAllByUserIdAndStatusWanted(userId, true);
        order.setLigneCommandes(commandLines);
        for ( CommandLine commandLine : commandLines){
            commandLine.setStatusWanted(false);
            Long id= commandLine.getIdLigneCom();
            commandLineService.updateCommandLine(id,commandLine);
        }
        return orderRepository.save(order);
    }



    @Override
    public Orderr updateOrder(Long id, Orderr updatedOrder) {
        Orderr existingOrder = orderRepository.findById(Math.toIntExact(id)).orElse(null);
        if (existingOrder != null) {
            existingOrder.setDateCommande(existingOrder.getDateCommande());
            if(updatedOrder.getModePayement()!=null){
                existingOrder.setModePayement(updatedOrder.getModePayement());
            }else{
                existingOrder.setModePayement(existingOrder.getModePayement());
            }
            if(updatedOrder.getNbProduit() != null){
                existingOrder.setNbProduit(updatedOrder.getNbProduit());
            }else{
                existingOrder.setNbProduit(existingOrder.getNbProduit());
            }
            existingOrder.setRemise(updatedOrder.getRemise());
            existingOrder.setStatusCom(updatedOrder.isStatusCom());
            if(updatedOrder.getTotalPrix() != 0.0f){
                existingOrder.setTotalPrix(updatedOrder.getTotalPrix());
            }else{
                existingOrder.setTotalPrix(existingOrder.getTotalPrix());
            }
            return orderRepository.save(existingOrder);
        } else {
            return null;
        }
    }
    @Override
    public Orderr getLastOrderForUser() {
        Long userId=2L;
        Orderr orderr = orderRepository.findByUserIdAndStatusCom(2L,false);
        return orderr;
    }

    @Override
    public List<CommandLine> getCommandLinesByOrder(Long id){
        List<CommandLine> commandLines = new ArrayList<>();
        Orderr orderr = new Orderr();
        orderr=orderRepository.findByIdCom(id);
        commandLines = orderr.getLigneCommandes();
        return commandLines;
    }
    @Override
    public Void deleteOrder(Long id) {
        orderRepository.deleteById(Math.toIntExact(id));
        return null;
    }
    @Override
    public List<Orderr> getAllOrders() {
        return orderRepository.findAll();
    }
    @Override
    public Orderr getOrderById(Long id) {
        return orderRepository.findByIdCom(id);
    }

    @Override
    public Orderr updateStatusOrder(Long idOrder){
        Orderr orderr = new Orderr();
        orderr=orderRepository.findByIdCom(idOrder);
        orderr.setIdCom(idOrder);
        orderr.setStatusCom(true);
        return orderRepository.save(orderr);
    }
    @Override
    public List<Orderr> findAllOrdersSortedByDateAsc() {
        return orderRepository.findAllByOrderByDateCommandeAsc();
    }
    @Override
    public List<Orderr> findAllOrdersSortedByDateDesc() {
        return orderRepository.findAllByOrderByDateCommandeDesc();
    }
}
