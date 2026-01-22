package esprit.tn.projetspring.Service;

import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.ShopManag.Rating;
import esprit.tn.projetspring.Entity.UserManag.User;
import esprit.tn.projetspring.Interface.RatingInterface;
import esprit.tn.projetspring.Repository.ProductRepository;
import esprit.tn.projetspring.Repository.RatingRepository;
import esprit.tn.projetspring.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class RatingService implements RatingInterface {

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public Rating rateProduct(Long productId, Long userId, int stars) throws UserPrincipalNotFoundException {
        // Récupérer le produit
        Product product = productRepository.findByIdProduit(productId);

        // Vérifier si le produit existe
        if (product == null) {
            throw new IllegalArgumentException("Product not found with id: " + productId);
        }
        float currentRating = product.getAverage();
        int totalRatings = product.getRatings().size();
        float newAverageRating = (currentRating * totalRatings + stars) / (totalRatings + 1);
        product.setAverage(newAverageRating);
        // Récupérer l'utilisateur
        Optional<User> userOptional = userRepository.findById(userId);
        // Vérifier si l'utilisateur existe
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }
        User user = userOptional.get();

        // Vérifier si l'utilisateur a déjà noté ce produit
        Rating existingRating = ratingRepository.findByProductIdProduitAndUserId(productId, userId);
        if (existingRating != null) {
            // Mise à jour de la note existante
            existingRating.setNbrStars(stars);
            return ratingRepository.save(existingRating);
        } else {
            // Créer une nouvelle notation
            Rating rating = new Rating();
            rating.setProduct(product);
            rating.setUser(user);
            rating.setNbrStars(stars);

            // Enregistrer la notation dans la base de données
            return ratingRepository.save(rating);
        }
    }

    @Override
    public Rating updateRating(Long id, Rating rating) {
        if (ratingRepository.existsById(Math.toIntExact(id))) {
            rating.setIdRate(id);
            return ratingRepository.save(rating);
        }
        return null; // Gérer l'erreur si l'ID n'existe pas
    }

    @Override
    public Void deleteRating(Long id) {
        ratingRepository.deleteById(Math.toIntExact(id));
        return null;
    }

    @Override
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
    @Override
    public Rating getRatingById(Long id) {
        return ratingRepository.findByIdRate(id);
    }

    @Override
    public double calculateAverageRatingForProduct(Long productId) {
        List<Rating> ratings = ratingRepository.findByProductIdProduit(productId);

        if (ratings.isEmpty()) {
            return 0.0;
        }

        double totalStars = ratings.stream().mapToInt(Rating::getNbrStars).sum();
        return totalStars / ratings.size();
    }
    /*@Override
    public void rateProduct(Long id, Rating rating) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        double currentRating = product.getAverageRating();
        int totalRatings = product.getRatings().size();
        double newAverageRating = (currentRating * totalRatings + rating) / (totalRatings + 1);
        product.setAverageRating(newAverageRating);
        productRepository.save(product);
    }
}*/


}
