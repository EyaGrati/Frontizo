package esprit.tn.projetspring.Controller;

import esprit.tn.projetspring.Entity.ShopManag.CommandLine;
import esprit.tn.projetspring.Entity.ShopManag.Product;
import esprit.tn.projetspring.Entity.dto.Shop.ProductInfo;
import esprit.tn.projetspring.Interface.CommandLineInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class CommandLineController {

    @Autowired
    CommandLineInterface commandLineInterface;

    @PostMapping("/addToCart/{userId}")
    public CommandLine addToCart(@RequestBody Product product,@PathVariable Long userId){
        System.out.println(userId);
        return commandLineInterface.addToCart(product, userId);
    }

    @GetMapping("/getCart/{userId}")
    public List<ProductInfo> findProductsInfoByUserIdAndWantedBy(@PathVariable Long userId){
        System.out.println("test2");
        return commandLineInterface.findProductsInfoByUserIdAndWantedBy(userId);
    }
    @PutMapping("/updateQuantity/{quantity}/{idCart}")
    public CommandLine updateQuantity(@PathVariable float quantity, @PathVariable Long idCart){
        return commandLineInterface.updateQuantity(quantity,idCart);
    }

    @PostMapping("/addCommandLine")
    public CommandLine addCommandLine (@RequestBody CommandLine CL){

        return commandLineInterface.addCommandLine(CL);
    }

    @PutMapping("/updateCommandLine/{id}")
    public CommandLine updateCommandLine(@PathVariable Long id, @RequestBody CommandLine commandLine) {
        return commandLineInterface.updateCommandLine(id, commandLine);
    }

    @PutMapping("/updateCart")
    public CommandLine updateCart(@RequestBody ProductInfo productInfo){
        return commandLineInterface.updateCart(productInfo);
    }

    @DeleteMapping("/deleteCommandLine/{id}")
    public Void deleteCommandLine(@PathVariable Long id) {

        return commandLineInterface.deleteCommandLine(id);
    }

    @GetMapping("/getAllCommandLines")
    public List<CommandLine> getAllCommandLines() {

        return commandLineInterface.getAllCommandLines();
    }

    @GetMapping("/getAllCommandLine/{id}")
    public CommandLine getCommandLineById(@PathVariable Long id) {

        return commandLineInterface.getCommandLineById(id);
    }

    @GetMapping("/getProductByCommandLine/{id}")
    public Product getProductByCommandLine(@PathVariable Long id){
        return commandLineInterface.getProductByCommandLine(id);
    }

    @GetMapping("/sort-by-price-asc")
    public List<ProductInfo> getProductsSortedByPriceAsc() {
        return commandLineInterface.sortByTotalPriceAsc();
    }

    @GetMapping("/sort-by-price-desc")
    public List<ProductInfo> getProductsSortedByPriceDesc() {
        return commandLineInterface.sortByTotalPriceDesc();
    }
}
