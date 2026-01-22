package esprit.tn.projetspring.Controller;

import esprit.tn.projetspring.Entity.ShopManag.Rating;
import esprit.tn.projetspring.Entity.dto.Shop.RatingDto;
import esprit.tn.projetspring.Interface.RatingInterface;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class RatingController {

    RatingInterface ratingInterface;

    @PostMapping("/addRating")
    public Rating rateProduct(@RequestBody RatingDto ratingDto) throws UserPrincipalNotFoundException {
        return ratingInterface.rateProduct(ratingDto.getProductId(), ratingDto.getUserId(), ratingDto.getStars());
    }

    @PutMapping("/updateRating/{id}")
    public Rating updateRating(@PathVariable Long id, @RequestBody Rating rating) {
        return ratingInterface.updateRating(id, rating);
    }

    @DeleteMapping("/deleteRating/{id}")
    public Void deleteRating(@PathVariable Long id) {
        return ratingInterface.deleteRating(id);
    }

    @GetMapping("/getAllRatingss")
    public List<Rating> getAllRatingss() {
        return ratingInterface.getAllRatings();
    }

    @GetMapping("/getAllRatingById/{id}")
    public Rating getRatingById(@PathVariable Long id) {
        return ratingInterface.getRatingById(id);
    }

    @GetMapping("/average/{productId}")
    public Double getAverageRatingForProduct(@PathVariable Long productId) {
        return ratingInterface.calculateAverageRatingForProduct(productId);
    }
}
