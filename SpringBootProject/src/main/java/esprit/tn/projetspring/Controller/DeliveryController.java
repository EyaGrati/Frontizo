package esprit.tn.projetspring.Controller;

import esprit.tn.projetspring.Entity.ShopManag.Delivery;
import esprit.tn.projetspring.Entity.dto.Shop.DeliveryDto;
import esprit.tn.projetspring.Interface.DeliveryInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class DeliveryController {

    @Autowired
    DeliveryInterface deliveryInterface;

    @PostMapping("/addDelivery")
    public Delivery addDelivery (@RequestBody DeliveryDto deliveryDto){

        return deliveryInterface.addDelivery(deliveryDto);
    }

    @PutMapping("/updateDelivery/{id}")
    public Delivery updateDelivery(@PathVariable Long id, @RequestBody Delivery delivery) {
        return deliveryInterface.updateDelivery(id, delivery);
    }

    @DeleteMapping("/deleteDelivery/{id}")
    public Void deleteDelivery(@PathVariable Long id) {
        return deliveryInterface.deleteDelivery(id);
    }

    @GetMapping("/getAllDeliverys")
    public List<Delivery> getAllDeliverys() {
        return deliveryInterface.getAllDeliverys();
    }

    @GetMapping("/getAllDeliveryById/{id}")
    public Delivery getDeliveryById(@PathVariable Long id) {
        return deliveryInterface.getDeliveryById(id);
    }

    @PutMapping("/delivery/{idDelivery}/accept/{idUser}")
    public Delivery setDeliveryAccepted(@PathVariable Long idDelivery, @PathVariable Long idUser) {
        return deliveryInterface.setDeliveryAccepted(idDelivery, idUser);
    }

    @GetMapping("/accepted")
    public List<Delivery> getAllDeliveriesAccepted() {
        return  deliveryInterface.getAllDeliveriesAccepted();
    }

    @PutMapping("/deliverydone/{idDelivery}")
    public Delivery setDeliveryDone(@PathVariable Long idDelivery) {
        return deliveryInterface.setDeliveryDone(idDelivery);
    }

    @GetMapping("/getAllDeliveriesBack")
    public List<Delivery> getAllDeliveries() {
        return deliveryInterface.getAllDelivery();
    }

    @GetMapping("/deliveriesSearch/{searchDelivery}")
    public List<Delivery> searchDeliveries(@PathVariable String searchDelivery) {
        return deliveryInterface.searchDeliveries(searchDelivery);
    }

    @GetMapping("/stats/by-governorate")
    public ResponseEntity<Map<String, Integer>> getDeliveryStatsByGovernorate() {
        Map<String, Integer> deliveryStats = deliveryInterface.getDeliveryStatsByGovernorate();
        return ResponseEntity.ok().body(deliveryStats);
    }
}
