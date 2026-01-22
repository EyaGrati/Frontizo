package esprit.tn.projetspring.Repository;

import esprit.tn.projetspring.Entity.UserManag.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findByCountry(String country);
}
