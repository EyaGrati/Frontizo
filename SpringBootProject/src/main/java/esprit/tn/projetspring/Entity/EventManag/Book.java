package esprit.tn.projetspring.Entity.EventManag;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idBook;
    String titreBook;
    TypeBook typeBook;
    String pdfBook;
    String AuthorName;

    @ManyToOne
    private Favoris favoris;
}
