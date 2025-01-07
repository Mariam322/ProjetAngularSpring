package tn.iit.entites;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class CompteBancaire implements Serializable{
	//identifiant qui identifie les valeurs serialize
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //autoIncrement
	private Long rib;
	private double solde;
	private Date createdAt;
	//un compte appartient a un client
	//PLUSIUERS compte pour un client  
	@ManyToOne
	@JoinColumn(name = "client_banque_id")
	private ClientBanque clientBanque;
	@Transient
	private int currentPage;
	@Transient
	private int totalPages;
	@Transient
	private int pageSize;
	

}
