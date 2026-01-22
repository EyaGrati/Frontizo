package esprit.tn.projetspring.Entity.exception;

public class EmailExistsExecption extends RuntimeException{
    public EmailExistsExecption(String message){
        super(message);
    }
}
