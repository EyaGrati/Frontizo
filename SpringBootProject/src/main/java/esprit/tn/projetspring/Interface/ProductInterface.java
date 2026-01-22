package esprit.tn.projetspring.Interface;

import esprit.tn.projetspring.Entity.ShopManag.Categorie;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.ShopManag.TypeShop;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ProductInterface {

    public Product addProduct(String nomProduit, LocalDate dateFabrication, LocalDate dateExpiration,
                              String description, float prixProduit, MultipartFile imageFile, int nbrProduit, Categorie categorie, TypeShop typeShop,
                              float widthPtoduct, float heightProduct);

    public Product updateProduct (Long id,String nomProduit, LocalDate dateFabrication, LocalDate dateExpiration,
                                  String description, float prixProduit, MultipartFile imageFile, int nbrProduit, Categorie categorie, TypeShop typeShop,
                                  float widthProduct, float heightProduct);

    public Void deleteProduct(Long id);

    public List<Product> getAllProducts();

    public Optional<Product> getProductById(Long id);

    public List<Product> searchProduct(String nomProduit);

    public List<Product> filterProducts(Float minPrice, Float maxPrice, List<Categorie> categories);

    public List<Product> getProductsSortedByPriceAscending();

    public List<Product> getProductsSortedByPriceDescending();

    Product updateQuantityProduct(Long idProduct, int quantity);

    List<Product> getProductsByCategory(Categorie categorie);

    Map<String, Integer> getCategoryStats();
    List<Product> getProductsByHigherAverageRating();

    float getAverageRating(Long id);

    Map<String, Double> getProductRatingStats();
}
