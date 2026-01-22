package esprit.tn.projetspring.Interface;

import esprit.tn.projetspring.Entity.ShopManag.Promotion;

import java.util.List;

public interface PromotionInterface {

    public Promotion addPromotion (Promotion promotion);

    public Promotion updatePromotion(Long id, Promotion promotion);

    public Void deletePromotion(Long id);

    public List<Promotion> getAllPromotions();

    public Promotion getPromotionById(Long id);

    public float Discount(String code, float total);

    public void updateExpiredPromoCodes();
}
