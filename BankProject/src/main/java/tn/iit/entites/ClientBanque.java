package tn.iit.entites;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor //obligatoire
@AllArgsConstructor //constructeur avec tous les parametr
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
//mapping jpa
@Entity
public class ClientBanque {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 
private String nom;
 private String email;
 //un client peut avoir plusieurs comptes on doit declarer liste de compte 
 @OneToMany(mappedBy = "clientBanque") //relation bidirectionnelle on dit a client que dans la classe banque 
//aacount ilya un cle de client 
 //quand j'ai besoin d'un client je n'ai pas besoin de tous les compte donc jsonproprety
 @JsonProperty(access = Access.WRITE_ONLY)
 private List<CompteBancaire> compteBancaire;
 
 public ClientBanque(String nom, String email) {
		super();
		this.nom = nom;
		this.email = email;
	}
}


