package esprit.tn.projetspring.Controller;

import esprit.tn.projetspring.Entity.ShopManag.Categorie;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.ShopManag.TypeShop;
import esprit.tn.projetspring.Interface.ProductInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductInterface productInterface;

    @PostMapping("/addProduct")
    public Product addProduct(@RequestParam("file") MultipartFile imageFile,
                              @RequestParam("nomProduit") String nomProduit,
                              @RequestParam("dateFabrication") LocalDate dateFabrication,
                              @RequestParam("dateExpiration") LocalDate dateExpiration,
                              @RequestParam("description") String description,
                              @RequestParam("prixProduit") float prixProduit,
                              @RequestParam("nbrProduit") int nbrProduit,
                              @RequestParam("categorie")Categorie categorie,
                              @RequestParam("typeShop")TypeShop typeShop,
                              @RequestParam("widthProduct") float widthProduct,
                              @RequestParam("heightProduct") float heightProduct) {
            System.out.println("t");
        return productInterface.addProduct(nomProduit, dateFabrication, dateExpiration, description,
                prixProduit, imageFile, nbrProduit, categorie, typeShop, widthProduct,heightProduct);
    }

    @PutMapping("/updateProduct/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestParam("file") MultipartFile imageFile,
                                 @RequestParam("nomProduit") String nomProduit,
                                 @RequestParam("dateFabrication") LocalDate dateFabrication,
                                 @RequestParam("dateExpiration") LocalDate dateExpiration,
                                 @RequestParam("description") String description,
                                 @RequestParam("prixProduit") float prixProduit,
                                 @RequestParam("nbrProduit") int nbrProduit,
                                 @RequestParam("categorie")Categorie categorie,
                                 @RequestParam("typeShop")TypeShop typeShop,
                                 @RequestParam("widthProduct") float widthProduct,
                                 @RequestParam("heightProduct") float heightProduct) {

        return productInterface.updateProduct (id,nomProduit,dateFabrication,dateExpiration,
                description, prixProduit, imageFile, nbrProduit, categorie, typeShop,widthProduct,heightProduct);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public Void deleteProduct(@PathVariable Long id) {
        return productInterface.deleteProduct(id);
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return productInterface.getAllProducts();
    }

    @GetMapping("/getAllProductById/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productInterface.getProductById(id);
    }
    @GetMapping("/searchProduct/{nomProduit}")
    public List<Product> searchProduct(@PathVariable String  nomProduit){
        return productInterface.searchProduct(nomProduit);
    }
    @GetMapping("/filtrer")
    public List<Product> filterProducts( @RequestParam(name = "minPrice", required = false) Float minPrice,
                                         @RequestParam(name = "maxPrice", required = false) Float maxPrice,
                                         @RequestParam(name = "categories", required = false) List<Categorie> categories){
        System.out.println(categories);
        return productInterface.filterProducts(minPrice,maxPrice,categories);

    }

    @GetMapping("/sortByPriceAscending")
    public List<Product> getProductsSortedByPriceAscending() {
        return productInterface.getProductsSortedByPriceAscending();
    }

    @GetMapping("/sortByPriceDescending")
    public List<Product> getProductsSortedByPriceDescending() {
        return productInterface.getProductsSortedByPriceDescending();
    }

    @PutMapping("/updateQuantityProduct/{idProduct}/{quantity}")
    public Product updateQuantityProduct(@PathVariable Long idProduct, @PathVariable int quantity) {
        System.out.println("icii");
        return productInterface.updateQuantityProduct(idProduct, quantity);
    }

    @GetMapping("/getProductsByCategory/{categorie}")
    public List<Product> getProductsByCategory(@PathVariable Categorie categorie){
        return productInterface.getProductsByCategory(categorie);
    }

    @GetMapping("/category-stats")
    public Map<String, Integer> getCategoryStats() {
        return productInterface.getCategoryStats();
    }

    @GetMapping("/high-rated")
    public List<Product> getProductsByHigherAverageRating() {
        return productInterface.getProductsByHigherAverageRating();
    }

    @GetMapping("/{id}/average-rating")
    public double getAverageRating(@PathVariable Long id) {
        return productInterface.getAverageRating(id);
    }

    @GetMapping("/product-ratings")
    public ResponseEntity<Map<String, Double>> getProductRatingStats() {
        Map<String, Double> productRatingStats = productInterface.getProductRatingStats();
        return ResponseEntity.ok().body(productRatingStats);
    }

}
