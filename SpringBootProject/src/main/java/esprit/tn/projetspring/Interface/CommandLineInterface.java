package esprit.tn.projetspring.Interface;

import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.dto.Shop.ProductInfo;

import java.util.List;

public interface CommandLineInterface {

    public CommandLine addToCart(Product product, Long idUser);

    public CommandLine addCommandLine (CommandLine CL);

    public CommandLine updateCommandLine(Long id, CommandLine commandLine);

    public Void deleteCommandLine(Long id);

    public List<CommandLine> getAllCommandLines();

    public CommandLine getCommandLineById(Long id);

    List<ProductInfo> findProductsInfoByUserIdAndWantedBy(Long userId);

    public CommandLine updateQuantity(Float quantity, Long idCart);
    public CommandLine updateCart(ProductInfo productInfo);
    public Product getProductByCommandLine(Long id);
    public List<ProductInfo> sortByTotalPriceAsc();
    public List<ProductInfo> sortByTotalPriceDesc();
}
