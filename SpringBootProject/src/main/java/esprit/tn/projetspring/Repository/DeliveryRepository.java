package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.Delivery;
import esprit.tn.projetspring.Entity.UserManag.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery,Integer> {
    Delivery findByIdLivraison(Long id);

    List<Delivery> findByStatusLiv(boolean b);

    List<Delivery> findByStatusAffectAndCountry(boolean b, String country);

    List<Delivery> findByStatusAffectAndUserAndStatusLiv(boolean b, User user, boolean b1);

    List<Delivery> findByFirstName(String inputsearch);

    List<Delivery> findByLastName(String inputsearch);

    //List<Delivery> findByFirstNameAndLastName(String inputsearch);

    List<Delivery> findByPhone(long inputsearch);

    @Query("SELECT d FROM Delivery d WHERE d.firstName LIKE %:keyword% OR d.lastName LIKE %:keyword% OR d.phone = :phoneNumber OR d.country LIKE %:keyword%")
    List<Delivery> searchDeliveries(@Param("keyword") String keyword, @Param("phoneNumber") Long phoneNumber);

    @Query("SELECT d.country, COUNT(d) FROM Delivery d GROUP BY d.country")
    List<Object[]> countDeliveriesByGovernorate();
}
