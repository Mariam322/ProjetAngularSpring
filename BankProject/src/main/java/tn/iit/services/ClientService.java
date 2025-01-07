package tn.iit.services;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.iit.entites.ClientBanque;
import tn.iit.entites.CompteBancaire;
import tn.iit.exception.ClientNotFoundException;
import tn.iit.repositories.ClientRepository;
import tn.iit.repositories.CompteBancaireRepository;

//injecter dependance 
@RequiredArgsConstructor
@Service
@Transactional //a chaque fois que j'appel la operation spring demarre la transaction si lamethode genere une exception il va faire rollback sinon commit
@Slf4j
public class ClientService {

//il faut ajouter final pour les attribut peut etre initialise

	private final ClientRepository clientRepository;
	private final CompteBancaireRepository compteRepository;

	public ClientBanque saveOrUpdate(ClientBanque client) {
		log.info("saving new customer");
		return clientRepository.save(client);
	
	}

	public List<ClientBanque> findAll() {

		return clientRepository.findAll();

	}

	public void delete(Long id) throws IllegalStateException {
	    List<CompteBancaire> comptes = compteRepository.findByClientBanque_Id(id);
	    
	    if (!comptes.isEmpty()) {
	        throw new IllegalStateException("Cannot delete client with associated accounts.");
	    }
	    
	    clientRepository.deleteById(id);
	}

	public ClientBanque getById(Long id) throws ClientNotFoundException {

		return clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException(id + " Client Not Found"));

	}
	public List<ClientBanque>searchClient(String keyword){
		return clientRepository.searchClient("%"+keyword+"%");//% quelque soit les carateeres avant ou apres
		
	}
	public List<CompteBancaire> getComptesByClientId(Long clientId) {
        return compteRepository.findByClientBanque_Id(clientId);
    }

}