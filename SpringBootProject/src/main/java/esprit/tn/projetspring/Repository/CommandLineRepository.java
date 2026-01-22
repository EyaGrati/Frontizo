package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandLineRepository extends JpaRepository<CommandLine,Integer> {
    CommandLine findByIdLigneCom(Long id);


    @Query("SELECT c.quantite FROM CommandLine c WHERE c.statusWanted = true AND c.userId = ?1 AND c.product= ?2" )
    List<Float> findQuantitiesByUserId(Long userId, Product product);

    @Query("SELECT c.prix_total_product FROM CommandLine c WHERE c.statusWanted = true AND c.userId = ?1 AND c.product= ?2" )
    List<Float> findTotalPricesInfoByUserId(Long userId, Product product);

    @Query("SELECT c.idLigneCom FROM CommandLine c WHERE c.statusWanted = true AND c.userId = ?1 AND c.product = ?2")
    List<Long> findIdCarts(Long userId, Product product);

    List<CommandLine> findAllByUserIdAndStatusWanted(Long userId, boolean b);
}
