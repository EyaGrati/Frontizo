package esprit.tn.projetspring.Controller;

import esprit.tn.projetspring.Entity.ShopManag.Promotion;
import esprit.tn.projetspring.Entity.ShopManag.Rating;
import esprit.tn.projetspring.Interface.PromotionInterface;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class PromotionController {

    PromotionInterface promotionInterface;

    @PostMapping("/addPromotion")
    public Promotion addPromotion (@RequestBody Promotion promotion){

        return promotionInterface.addPromotion(promotion);
    }

    @PutMapping("/updatePromotion/{id}")
    public Promotion updatePromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        System.out.println("update");
        return promotionInterface.updatePromotion(id, promotion);

    }

    @DeleteMapping("/deletePromotion/{id}")
    public Void deletePromotion(@PathVariable Long id) {
        return promotionInterface.deletePromotion(id);
    }

    @GetMapping("/getAllPromotions")
    public List<Promotion> getAllPromotions() {
        return promotionInterface.getAllPromotions();
    }

    @GetMapping("/getPromotionById/{id}")
    public Promotion getPromotionById(@PathVariable Long id) {
        System.out.println("get ");
        return promotionInterface.getPromotionById(id);
    }
    @GetMapping("/discount")
    public float Discount( @RequestParam String code, @RequestParam float total){
        System.out.println("calcul2");
        return promotionInterface.Discount(code,total);
    }


}
