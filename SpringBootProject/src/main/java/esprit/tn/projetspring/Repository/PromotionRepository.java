package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Promotion findByIdPromotion(Long id);

    Promotion findByCode(String code);

    List<Promotion> findByExpireTrue();

    List<Promotion> findByExpirationDate(LocalDate today);
}
