package esprit.tn.projetspring.Interface;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Orderr;
import esprit.tn.projetspring.Entity.dto.Shop.PaymentInfo;
import esprit.tn.projetspring.Entity.dto.Shop.PlaceOrderDto;

import java.util.List;

public interface OrderrInterface {

    public Orderr addOrder (Orderr order, Long userId) ;

    public Orderr updateOrder(Long id, Orderr order);

    public Void deleteOrder(Long id);

    public List<Orderr> getAllOrders();

    public Orderr getOrderById(Long id);

    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

    public Orderr placeOrder(PlaceOrderDto placeOrderDto);

    public Orderr getLastOrderForUser();

    public List<CommandLine> getCommandLinesByOrder(Long id);

    public Orderr updateStatusOrder(Long idOrder);

    List<Orderr> findAllOrdersSortedByDateAsc();

    List<Orderr> findAllOrdersSortedByDateDesc();
}
