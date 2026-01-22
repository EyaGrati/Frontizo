package esprit.tn.projetspring.Entity.exception;

public class NotFoundExecption extends RuntimeException{
    public NotFoundExecption(String message){
        super(message);
    }
}
