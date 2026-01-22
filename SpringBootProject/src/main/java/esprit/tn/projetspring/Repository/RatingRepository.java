package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Integer> {
    Rating findByIdRate(Long id);

    Rating findByProductIdProduitAndUserId(Long productId, Long userId);

    List<Rating> findByProductIdProduit(Long productId);
}
