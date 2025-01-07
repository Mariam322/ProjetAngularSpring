package tn.iit.services;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.iit.entites.ClientBanque;
import tn.iit.entites.CompteBancaire;
import tn.iit.exception.ClientNotFoundException;
import tn.iit.exception.CompteNotFoundException;
import tn.iit.repositories.ClientRepository;
import tn.iit.repositories.CompteBancaireRepository;

//injecter dependance 
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class CompteService {

//il faut ajouter final pour les attribut peut etre initialise

	private final CompteBancaireRepository compteRepository;
	private final ClientRepository clientRepository;

	public CompteBancaire saveCompteBancaireByIdClient(Long id, CompteBancaire compteBancaire)
			throws ClientNotFoundException {
		log.info("Saving account for client with ID: " + id);

		// Récupérer le client par son ID
		ClientBanque client = clientRepository.findById(id)
				.orElseThrow(() -> new ClientNotFoundException("Client with ID " + id + " not found"));

		// Associer le client au compte bancaire
		compteBancaire.setClientBanque(client);

		// Sauvegarder le compte bancaire
		return compteRepository.save(compteBancaire);
	}
@Transactional
	public CompteBancaire saveOrUpdate(CompteBancaire compte) {
		log.info("saving new compte");
		return compteRepository.save(compte);

	}

	public List<CompteBancaire> findAll() {

		return compteRepository.findAll();

	}

	public void delete(Long rib) {

		compteRepository.deleteById(rib);

	}
	public void deleteCompteByRib(Long rib) throws CompteNotFoundException {
	    // Récupérer le compte bancaire par son RIB
	    CompteBancaire compte = compteRepository.findById(rib)
	            .orElseThrow(() -> new CompteNotFoundException("Compte avec RIB " + rib + " non trouvé"));

	    // Supprimer le compte
	    compteRepository.delete(compte);
	}
	public CompteBancaire getById(Long rib) throws CompteNotFoundException {

		return compteRepository.findById(rib).orElseThrow(() -> new CompteNotFoundException(rib + "Compte Not Found"));

	}
	 // Méthode pour récupérer les comptes par client ID
    public List<CompteBancaire> getComptesByClientId(Long clientId) throws ClientNotFoundException {
        List<CompteBancaire> comptes = compteRepository.findByClientBanque_Id(clientId);
        if (comptes.isEmpty()) {
            throw new ClientNotFoundException("No accounts found for client with ID: " + clientId);
        }
        return comptes;
    }

	public void debiter(Long rib, double montant) throws CompteNotFoundException {
		CompteBancaire compte = compteRepository.findById(rib)
				.orElseThrow(() -> new CompteNotFoundException(rib + "compte  not found"));
		// Vérifier si le solde est suffisant
		if (compte.getSolde() < montant) {
			throw new IllegalArgumentException("Insufficient balance to debit the account");
		}

		// Débiter le montant
		compte.setSolde(compte.getSolde() - montant);

		// Sauvegarder les modifications
		compteRepository.save(compte);
	}

	public void crediter(Long rib, double montant) throws CompteNotFoundException {
		log.info("Crediting account with RIB: " + rib + " by amount: " + montant);

		// Récupérer le compte bancaire par son RIB
		CompteBancaire compte = compteRepository.findById(rib)
				.orElseThrow(() -> new CompteNotFoundException("Account with RIB " + rib + " not found"));

		// Créditer le montant
		compte.setSolde(compte.getSolde() + montant);

		// Sauvegarder les modifications
		compteRepository.save(compte);
	}

	/*public List<CompteBancaire> getAccountList(Long rib, int page, int size) {
		// Assurer que page et size sont valides (par exemple, page >= 0, size > 0)
		Pageable pageable = (Pageable) PageRequest.of(page, size);

		// Récupérer la page des comptes bancaires
		Page<CompteBancaire> byRib = compteRepository.findByRib(rib, pageable);

		// Retourner la liste des comptes à partir de la page
		return byRib.getContent(); // getContent() extrait la liste des éléments de la page
	}*/
	
	 /*public List<CompteBancaire> getComptesByClientId(Long id) {
	        return compteRepository.findByClientId(id);
	    }*/
	}
