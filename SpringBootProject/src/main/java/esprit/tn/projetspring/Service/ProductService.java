package esprit.tn.projetspring.Service;

import esprit.tn.projetspring.Entity.ShopManag.Categorie;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.ShopManag.TypeShop;
import esprit.tn.projetspring.Interface.ProductInterface;
import esprit.tn.projetspring.Repository.ProductRepository;
import esprit.tn.projetspring.Repository.RatingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

@Service

@Transactional
public class ProductService implements ProductInterface {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    RatingService ratingService;

    private final FileNamingUtil fileNamingUtil;
    private final String uploadProductImages;

    public ProductService(FileNamingUtil fileNamingUtil, @Value("${uploadProductImages}") String uploadProductImages) {
        this.fileNamingUtil = fileNamingUtil;
        this.uploadProductImages = uploadProductImages;
    }
    @Override
    public Product addProduct(String nomProduit, LocalDate dateFabrication, LocalDate dateExpiration,
                              String description, float prixProduit, MultipartFile imageFile, int nbrProduit, Categorie categorie, TypeShop typeShop,
                                float widthPtoduct, float heightProduct) {
        try {

            String fileName = fileNamingUtil.nameFile(imageFile);
            Path destinationPath = Paths.get(uploadProductImages, fileName);
            Files.copy(imageFile.getInputStream(), destinationPath);

            Product newProduct = new Product();
            newProduct.setNomProduit(nomProduit);
            newProduct.setDateFabrication(dateFabrication);
            newProduct.setDateExpiration(dateExpiration);
            newProduct.setDescription(description);
            newProduct.setPrixProduit(prixProduit);
            newProduct.setImageProduit(fileName.toString());
            newProduct.setNbrProduit(nbrProduit);
            newProduct.setCategorie(categorie);
            newProduct.setTypeShop(typeShop);
            newProduct.setHauteur(heightProduct);
            newProduct.setLargeur(widthPtoduct);

            // Enregistrer le produit dans la base de données
            return productRepository.save(newProduct);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf('.'));
    }
    @Override
    public Product updateProduct (Long id,String nomProduit, LocalDate dateFabrication, LocalDate dateExpiration,
                                  String description, float prixProduit, MultipartFile imageFile, int nbrProduit, Categorie categorie, TypeShop typeShop,
                                  float widthProduct, float heightProduct) {
        Product existingProduct = productRepository.findById(Math.toIntExact(id)).orElse(null);
        existingProduct.setIdProduit(id);
        try {

            String fileName = fileNamingUtil.nameFile(imageFile);
            Path destinationPath = Paths.get(uploadProductImages, fileName);
            Files.copy(imageFile.getInputStream(), destinationPath);
            existingProduct.setNomProduit(nomProduit);
            existingProduct.setDateFabrication(dateFabrication);
            existingProduct.setDateExpiration(dateExpiration);
            existingProduct.setDescription(description);
            existingProduct.setPrixProduit(prixProduit);
            existingProduct.setImageProduit(fileName.toString());
            existingProduct.setNbrProduit(nbrProduit);
            existingProduct.setCategorie(categorie);
            existingProduct.setTypeShop(typeShop);
            existingProduct.setLargeur(widthProduct);
            existingProduct.setHauteur(heightProduct);
            return productRepository.save(existingProduct);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    @Override
    public Void deleteProduct(Long id) {
        productRepository.deleteById(Math.toIntExact(id));
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return Optional.ofNullable(productRepository.findByIdProduit(id));
    }

    @Override
    public List<Product> searchProduct(String nomProduit){
        return productRepository.findByNomProduit(nomProduit);
    }

    @Override
    public List<Product> filterProducts(Float minPrice, Float maxPrice, List<Categorie> categories) {
        if(categories == null || categories.isEmpty()) {
            return productRepository.findByPrixProduitBetween(minPrice, maxPrice);
        } else {
            return productRepository.findByPrixProduitBetweenAndCategorieIn(minPrice, maxPrice, categories);
        }
    }
    @Override
    public List<Product> getProductsSortedByPriceAscending() {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "prixProduit"));
    }
    @Override
    public List<Product> getProductsSortedByPriceDescending() {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "prixProduit"));
    }
    @Override
    public Product updateQuantityProduct(Long idProduct, int quantity) {
        Product product = productRepository.findByIdProduit(idProduct);
        if (product != null) {
            int newQuantity = product.getNbrProduit() - quantity;
            if (newQuantity >= 0) {
                product.setNbrProduit(newQuantity);
                return productRepository.save(product);
            } else {
                throw new IllegalStateException("La quantité du produit ne peut pas être négative.");
            }
        } else {
            throw new IllegalArgumentException("Produit non trouvé pour l'ID: " + idProduct);
        }
    }

    @Override
    public List<Product> getProductsByCategory(Categorie categorie) {
        return productRepository.findByCategorie(categorie);
    }

    @Override
    public Map<String, Integer> getCategoryStats() {
        Map<String, Integer> categoryStats = new HashMap<>();
        List<Object[]> stats = productRepository.countProductsByCategory();
        for (Object[] stat : stats) {
            Categorie categorie = (Categorie) stat[0];
            String categorieName = categorie.name();
            Long count = (Long) stat[1];
            categoryStats.put(categorieName, count.intValue());
        }
        return categoryStats;
    }
    @Override
    public List<Product> getProductsByHigherAverageRating() {
        List<Product> allProducts = productRepository.findAll();
        List<Product> productsWithHigherRating = new ArrayList<>();
        for (Product product : allProducts) {
            double averageRating = ratingService.calculateAverageRatingForProduct(product.getIdProduit());
            if (averageRating > 2.5) {
                productsWithHigherRating.add(product);
            }
        }
        return productsWithHigherRating;
    }

    @Override
    public float getAverageRating(Long id) {
        Product product = productRepository.findByIdProduit(id);
        return product.getAverage();
    }

    @Override
    public Map<String, Double> getProductRatingStats() {
        Map<String, Double> productRatingStats = new HashMap<>();
        List<Product> products = productRepository.findAll();

        for (Product product : products) {
            // Suppose que chaque produit a un seul rating
            productRatingStats.put(product.getNomProduit(), product.getRatings().get(0).getIdRate().doubleValue());
        }

        return productRatingStats;
    }


}
