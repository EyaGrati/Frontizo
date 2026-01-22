package esprit.tn.projetspring.Interface;

import esprit.tn.projetspring.Entity.ShopManag.Delivery;
import esprit.tn.projetspring.Entity.dto.Shop.DeliveryDto;

import java.util.List;
import java.util.Map;

public interface DeliveryInterface {

    public Delivery addDelivery (DeliveryDto deliveryDto);

    //List<Delivery>getDeliveryNotAffected();

    Delivery setDeliveryDone(Long idDelivery);

    Delivery setDeliveryAccepted(Long idDelivery, Long idUser);

    public Delivery updateDelivery(Long id, Delivery delivery);

    public Void deleteDelivery(Long id);

    public List<Delivery> getAllDeliverys();

    List<Delivery> getAllDeliveriesAccepted();

    public Delivery getDeliveryById(Long id);

    List<Delivery> getAllDelivery();

    List<Delivery> searchDeliveries(String inputsearch);

    Map<String, Integer> getDeliveryStatsByGovernorate();
}
