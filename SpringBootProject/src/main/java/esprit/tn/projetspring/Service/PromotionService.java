package esprit.tn.projetspring.Service;

import esprit.tn.projetspring.Entity.ShopManag.Promotion;
import esprit.tn.projetspring.Interface.PromotionInterface;
import esprit.tn.projetspring.Repository.PromotionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PromotionService implements PromotionInterface {

    @Autowired
    PromotionRepository promotionRepository;

    @Override
    public Promotion addPromotion (Promotion promotion){
        promotion.setExpire(true);
        return promotionRepository.save(promotion);
    }
    @Scheduled(cron = "0 0 0 * * *")
    @Override
    public void updateExpiredPromoCodes() {
        LocalDate today = LocalDate.now();
        List<Promotion> expiredPromoCodes = promotionRepository.findByExpirationDate(today);
        for (Promotion promoCode : expiredPromoCodes) {
            promoCode.setExpire(false);
            promotionRepository.save(promoCode);
        }
    }

    @Override
    public Promotion updatePromotion(Long id, Promotion promotion) {
        if (promotionRepository.existsById((long) Math.toIntExact(id))) {
            promotion.setIdPromotion(id);
            return promotionRepository.save(promotion);
        }
        return null; // Gérer l'erreur si l'ID n'existe pas
    }

    @Override
    public Void deletePromotion(Long id) {
        promotionRepository.deleteById((long) Math.toIntExact(id));
        return null;
    }

    @Override
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findByExpireTrue();
    }

    @Override
    public Promotion getPromotionById(Long id) {
        return promotionRepository.findByIdPromotion(id);
    }

    @Override
    public float Discount(String code, float total){
        Promotion promotion = new Promotion();
        promotion= promotionRepository.findByCode(code);
        double discountPercentage = promotion.getDiscountPercentage();
        float discount = (float) ((total* discountPercentage)/100);
        return discount;
    }

}
