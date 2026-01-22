package esprit.tn.projetspring.Service;

import esprit.tn.projetspring.Entity.ShopManag.*;
import esprit.tn.projetspring.Entity.UserManag.User;
import esprit.tn.projetspring.Entity.dto.Shop.DeliveryDto;
import esprit.tn.projetspring.Interface.DeliveryInterface;
import esprit.tn.projetspring.Repository.DeliveryRepository;
import esprit.tn.projetspring.Repository.OrderrRepository;
import esprit.tn.projetspring.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
@Transactional
public class DeliveryService implements DeliveryInterface {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderrRepository orderrRepository;

    @Override
    public Delivery addDelivery(DeliveryDto deliveryDto) {
        Delivery delivery = new Delivery();
        delivery.setAdresseLiv(deliveryDto.getAddress());
        delivery.setPrixLiv(7);
        delivery.setCountry(deliveryDto.getCountry());
        delivery.setPostalCode(deliveryDto.getPostalCode());
        delivery.setDateActuelle(LocalDate.now());
        Long tel = deliveryDto.getPhone();
        delivery.setPhone(tel);
        Orderr order = orderrRepository.findByIdCom(deliveryDto.getIdCom());
        delivery.setOrderr(order);
        delivery.setTotalPrice(order.getTotalPrix() + 7);
        List<Product> products = new ArrayList<>();
        List<CommandLine> commandLines = order.getLigneCommandes();
        for (CommandLine c : commandLines) {
            products.add(c.getProduct());
        }
        float s = 0;
        for (Product p : products) {
            float largeur = p.getLargeur();
            float hauteur = p.getHauteur();
            float surface = (largeur + hauteur) * 2;
            s = s + surface;
            System.out.println(s);
        }
        delivery.setSurface(s);
        LocalDate dateLivraison = LocalDate.now().plusDays(2);
        delivery.setDateLivraison(dateLivraison);
        delivery.setFirstName(deliveryDto.getFirstName());
        delivery.setLastName(deliveryDto.getLastName());

        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery setDeliveryDone(Long idDelivery) {
        Delivery delivery = deliveryRepository.findByIdLivraison(idDelivery);
        delivery.setStatusLiv(true);
        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery setDeliveryAccepted(Long idDelivery, Long idUser) {
        Delivery delivery = deliveryRepository.findByIdLivraison(idDelivery);
        delivery.setStatusAffect(true);
        User user = userRepository.findById(idUser).get();
        delivery.setUser(user);
        return deliveryRepository.save(delivery);
    }

    /*@Scheduled(fixedRate = 24 * 60 * 60 * 1000) // Exécute toutes les 24 heures
    public void updateDeliveryStatus() {
        List<Delivery> deliveries = getAllDeliverys();
        LocalDate twoDaysAgo = LocalDate.now().minusDays(2);

        for (Delivery delivery : deliveries) {
            LocalDate deliveryCreationDate = delivery.getDateActuelle();
            if (deliveryCreationDate.isBefore(twoDaysAgo) && !delivery.isStatusAffect()) {
                delivery.setStatusAffect(true);
                deliveryRepository.save(delivery);
            }
        }
    }*/

    @Override
    public Delivery updateDelivery(Long id, Delivery updatedelivery) {
        Delivery existingDelivery = deliveryRepository.findById(Math.toIntExact(id)).orElse(null);
        if (existingDelivery != null) {
            if (updatedelivery.getDateLivraison() != null) {
                existingDelivery.setDateLivraison(updatedelivery.getDateLivraison());
            } else {
                existingDelivery.setDateLivraison(existingDelivery.getDateLivraison());
            }
            if (updatedelivery.getAdresseLiv() != null) {
                existingDelivery.setAdresseLiv(updatedelivery.getAdresseLiv());
            } else {
                existingDelivery.setAdresseLiv(existingDelivery.getAdresseLiv());
            }
            if (updatedelivery.getPrixLiv() != 0.0f) {
                existingDelivery.setPrixLiv(updatedelivery.getPrixLiv());
            } else {
                existingDelivery.setPrixLiv(existingDelivery.getPrixLiv());
            }
            existingDelivery.setStatusLiv(updatedelivery.isStatusLiv());
            return deliveryRepository.save(existingDelivery);
        } else {
            return null;
        }
    }

    @Override
    public Void deleteDelivery(Long id) {
        deliveryRepository.deleteById(Math.toIntExact(id));
        return null;
    }

    @Override
    public List<Delivery> getAllDeliverys() {
        User user = userRepository.findById(3L).get();
        String country = user.getCountry();
        List<Delivery> deliveries = deliveryRepository.findByStatusAffectAndCountry(false, country);
        return deliveries;
    }

    @Override
    public List<Delivery> getAllDeliveriesAccepted() {
        User user = userRepository.findById(3L).orElse(null);
        if (user == null) {

            return Collections.emptyList();
        }
        List<Delivery> deliveries = deliveryRepository.findByStatusAffectAndUserAndStatusLiv(true, user, false);
        return deliveries;
    }

    @Override
    public Delivery getDeliveryById(Long id) {
        return deliveryRepository.findByIdLivraison(id);
    }

    @Override
    public List<Delivery> getAllDelivery() {
        return deliveryRepository.findAll();
    }

    @Override
    public List<Delivery> searchDeliveries(String inputSearch) {
        if (inputSearch == null || inputSearch.isEmpty()) {
            return Collections.emptyList();
        }

        // Analysez l'entrée de recherche pour déterminer si elle est un numéro de téléphone
        Long phoneNumber = null;
        try {
            phoneNumber = Long.parseLong(inputSearch);
        } catch (NumberFormatException e) {
            // Si ce n'est pas un numéro de téléphone valide, ignorez l'exception
        }

        // Exécutez la requête personnalisée dans le repository
        return deliveryRepository.searchDeliveries(inputSearch, phoneNumber);
    }

    @Override
    public Map<String, Integer> getDeliveryStatsByGovernorate() {
        Map<String, Integer> statsByGovernorate = new HashMap<>();

        List<Object[]> stats = deliveryRepository.countDeliveriesByGovernorate();

        for (Object[] stat : stats) {
            String governorate = (String) stat[0];
            Long count = (Long) stat[1];
            statsByGovernorate.put(governorate, count.intValue());
        }

        return statsByGovernorate;
    }



}
