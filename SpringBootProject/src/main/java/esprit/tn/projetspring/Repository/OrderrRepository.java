package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.ShopManag.Orderr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderrRepository extends JpaRepository<Orderr,Integer> {
    Orderr findByIdCom(Long id);


    Orderr findByUserIdAndStatusCom(Long userId, boolean b);

    List<Orderr> findAllByOrderByDateCommandeAsc();

    List<Orderr> findAllByOrderByDateCommandeDesc();
}
