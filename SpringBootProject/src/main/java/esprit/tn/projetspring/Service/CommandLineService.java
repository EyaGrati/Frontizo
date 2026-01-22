package esprit.tn.projetspring.Service;

import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.dto.Shop.ProductInfo;
import esprit.tn.projetspring.Interface.CommandLineInterface;
import esprit.tn.projetspring.Repository.CommandLineRepository;
import esprit.tn.projetspring.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class CommandLineService implements CommandLineInterface {

    @Autowired
    CommandLineRepository commandLineRepository;

    @Autowired
    private ProductRepository productRepository;

   @Override
    public CommandLine addToCart(Product product, Long idUser) {
       CommandLine cart = new CommandLine();
       cart.setProduct(product);
       cart.setStatusWanted(true);
       cart.setUserId(idUser);
       cart.setQuantite(1);
       float prixTotal = product.getPrixProduit() * cart.getQuantite();
       cart.setPrix_total_product(prixTotal);
       return commandLineRepository.save(cart);
   }
    @Override
    public CommandLine updateQuantity(Float quantity, Long idCart){
       CommandLine commandLine = commandLineRepository.findByIdLigneCom(idCart);
       commandLine.setQuantite(quantity);
       return commandLineRepository.save(commandLine);
    }
    @Override
    public List<ProductInfo> findProductsInfoByUserIdAndWantedBy(Long userId) {
        List<Product> products = productRepository.findProductsInfoByUserId(userId);
        List<ProductInfo> productInfos = new ArrayList<>();
        for (Product result : products) {
            ProductInfo productInfo = new ProductInfo();
            productInfo.setIdProduit(result.getIdProduit());
            productInfo.setNomProduit(result.getNomProduit());
            productInfo.setDateFabrication(result.getDateFabrication());
            productInfo.setDateExpiration(result.getDateExpiration());
            productInfo.setDescription(result.getDescription());
            productInfo.setImageProduit(result.getImageProduit());
            productInfo.setNbrProduit(result.getNbrProduit());
            productInfo.setPrixProduit(result.getPrixProduit());
            productInfo.setStatusProd(result.isStatusProd());
            // Utilisez les méthodes qui retournent plusieurs valeurs
            List<Long> idCarts = commandLineRepository.findIdCarts(userId, result);
            List<Float> quantities = commandLineRepository.findQuantitiesByUserId(userId, result);
            List<Float> totalPrices = commandLineRepository.findTotalPricesInfoByUserId(userId, result);

            // Ajoutez les valeurs à chaque produit
            for (int i = 0; i < idCarts.size(); i++) {
                productInfo.setIdCart(idCarts.get(i));
                productInfo.setQuantity(quantities.get(i));
                productInfo.setTotalPrice(totalPrices.get(i));
                productInfo.setIdUser(userId);
                productInfos.add(productInfo);
            }
        }
        return productInfos;
    }

    @Override
    public CommandLine addCommandLine (CommandLine CL){

        return commandLineRepository.save(CL);
    }

    @Override
    public CommandLine updateCommandLine(Long id, CommandLine commandLine) {
        if (commandLineRepository.existsById(Math.toIntExact(id))) {
            commandLine.setIdLigneCom(id);
            return commandLineRepository.save(commandLine);
        }
        return null;
    }
    @Override
    public CommandLine updateCart(ProductInfo productInfo) {
        CommandLine commandLine = new CommandLine();
        // Assurez-vous que productInfo contient les informations nécessaires
        commandLine.setIdLigneCom(productInfo.getIdCart());
        commandLine.setStatusWanted(true);
        commandLine.setUserId(2L); // Vous définissez l'ID utilisateur à 2, vous pouvez ajuster cela selon vos besoins

        // Vous devez d'abord obtenir le produit à partir de productInfo et le définir dans l'objet CommandLine
        Product product = productRepository.findById(Math.toIntExact(productInfo.getIdProduit())).orElse(null);
        if (product != null) {
            commandLine.setProduct(product);
            commandLine.setQuantite(productInfo.getQuantity());
            commandLine.setPrix_total_product(productInfo.getTotalPrice());
            return commandLineRepository.save(commandLine);
        } else {
            // Gérez le cas où le produit n'existe pas
            return null;
        }
    }

    @Override
    public Product getProductByCommandLine(Long id){
        CommandLine commandLine=commandLineRepository.findByIdLigneCom(id);
       Product product = new Product();
       product=commandLine.getProduct();
       return product;
    }

    @Override
    public Void deleteCommandLine(Long id) {
        commandLineRepository.deleteById(Math.toIntExact(id));
        return null;
    }

    @Override
    public List<CommandLine> getAllCommandLines() {
        return commandLineRepository.findAll();
    }
    @Override
    public CommandLine getCommandLineById(Long id) {

        return commandLineRepository.findByIdLigneCom(id);
    }
    @Override
    public List<ProductInfo> sortByTotalPriceAsc() {
        List<ProductInfo> productInfos=findProductsInfoByUserIdAndWantedBy(2L);
        return productInfos.stream()
                .sorted(Comparator.comparing(ProductInfo::getTotalPrice))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductInfo> sortByTotalPriceDesc() {
        List<ProductInfo> productInfos=findProductsInfoByUserIdAndWantedBy(2L);
        return productInfos.stream()
                .sorted(Comparator.comparing(ProductInfo::getTotalPrice).reversed())
                .collect(Collectors.toList());
    }

}
