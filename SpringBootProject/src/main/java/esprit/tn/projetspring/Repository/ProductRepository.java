package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.Categorie;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    Product findByIdProduit(Long productId);
    @Query("SELECT p FROM Product p INNER JOIN CommandLine c ON p.idProduit = c.product.idProduit WHERE c.statusWanted = true AND c.userId = ?1")
    List<Product> findProductsInfoByUserId(Long userId);

    List<Product> findByNomProduit(String nomProduit);

    List<Product> findByPrixProduitBetweenAndCategorieIn(Float minPrice, Float maxPrice, List<Categorie> categories);

    List<Product> findByPrixProduitBetween(Float minPrice, Float maxPrice);

    List<Product> findByCategorie(Categorie categorie);

    @Query("SELECT p.categorie, COUNT(p) FROM Product p GROUP BY p.categorie")
    List<Object[]> countProductsByCategory();

}
