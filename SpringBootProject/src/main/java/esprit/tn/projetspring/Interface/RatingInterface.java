package esprit.tn.projetspring.Interface;

import esprit.tn.projetspring.Entity.ShopManag.Rating;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

public interface RatingInterface {

    public Rating rateProduct(Long productId, Long userId, int stars) throws UserPrincipalNotFoundException;

    public Rating updateRating(Long id, Rating rating);

    public Void deleteRating(Long id);

    public List<Rating> getAllRatings();

    public Rating getRatingById(Long id);
    public double calculateAverageRatingForProduct(Long productId);
}
