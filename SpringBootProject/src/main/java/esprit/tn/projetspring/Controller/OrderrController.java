package esprit.tn.projetspring.Controller;

import com.stripe.exception.StripeException;
import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Orderr;
import esprit.tn.projetspring.Entity.dto.Shop.PaymentInfo;
import esprit.tn.projetspring.Entity.dto.Shop.PlaceOrderDto;
import esprit.tn.projetspring.Interface.OrderrInterface;
import esprit.tn.projetspring.Service.OrderrService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class OrderrController {

    @Autowired
    OrderrInterface orderInterface;

    @Autowired
    public OrderrController(OrderrService checkoutService) {
        this.orderInterface = checkoutService;
    }

    @PostMapping("/addOrder")
    public Orderr addOrder (@RequestBody Orderr order, @RequestParam Long idUser){
        return orderInterface.addOrder(order, idUser);
    }


    @PutMapping("/updateOrder/{id}")
    public Orderr updateOrder(@PathVariable Long id, @RequestBody Orderr order) {
        return orderInterface.updateOrder(id, order);
    }

    @DeleteMapping("/deleteOrder/{id}")
    public Void deleteOrder(@PathVariable Long id) {
        return orderInterface.deleteOrder(id);
    }

    @GetMapping("/getAllOrders")
    public List<Orderr> getAllOrders() {
        return orderInterface.getAllOrders();
    }

    @GetMapping("/getAllOrderById/{id}")
    public Orderr getOrderById(@PathVariable Long id) {
        return orderInterface.getOrderById(id) ;
    }

    /*@PostMapping("/purchase/{userId}")
    public Orderr placeOrder(@RequestBody PaymentDetails paymentDetails,@PathVariable Long userId){
        return orderInterface.placeOrder(paymentDetails,userId);
    }*/
    @PostMapping("/purchase")
    public Orderr placeOrder (@RequestBody PlaceOrderDto placeOrderDto){
        System.out.println("heyheyeheyeh");
        return orderInterface.placeOrder(placeOrderDto);
    }

    @GetMapping("/getOrder")
    public Orderr getLastOrderForUser(){
        return orderInterface.getLastOrderForUser();
    }
    @GetMapping("/getCommandLineByOrder/{id}")
    public List<CommandLine> getCommandLinesByOrder(@PathVariable Long id){
        return orderInterface.getCommandLinesByOrder(id);
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {

        var paymentIntent = orderInterface.createPaymentIntent(paymentInfo);
        var paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/updateStatusOrder/{idOrder}")
    public Orderr updateStatusOrder(@PathVariable Long idOrder){
        return orderInterface.updateStatusOrder(idOrder);
    }

    @GetMapping("/getAllOrdersSortedByDateAsc")
    public List<Orderr> getAllOrdersSortedByDateAsc() {
        return orderInterface.findAllOrdersSortedByDateAsc();
    }

    @GetMapping("/getAllOrdersSortedByDateDesc")
    public List<Orderr> getAllOrdersSortedByDateDesc() {
        return orderInterface.findAllOrdersSortedByDateDesc();
    }
}
