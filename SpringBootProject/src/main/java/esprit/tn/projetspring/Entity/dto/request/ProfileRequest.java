package esprit.tn.projetspring.Entity.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {
    @Valid

    @NotBlank(message = "first name  is required and cannot be blank.")
    @Size(min=3,max = 25,message = "first name length min is 3 and max is 25")
    private String firstName;
    @NotBlank(message = "last name is required and cannot be blank.")
    @Size(min=3,max = 25,message = "last name length min is 3 and max is 25")
    private String lastName;
    @Pattern(regexp = "\\d{8}", message = "Invalid phone number format. It should be 8 numbers.")
    private String mobileNumber;
}
