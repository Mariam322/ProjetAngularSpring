package tn.iit.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.iit.entites.ClientBanque;
import tn.iit.entites.CompteBancaire;
import tn.iit.exception.ClientNotFoundException;
import tn.iit.services.ClientService;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*") // Autorise toute application de n'importe quel domaine à envoyer des requêtes à
					// cette API RESTful
public class ClientRestController {

	// Utilisation de la couche service car le contrôleur communique uniquement avec
	// la couche service
	private final ClientService clientService;

	@GetMapping("/clients")
	@PreAuthorize("hasAnyAuthority('SCOPE_USER', 'SCOPE_ADMIN')")
	public List<ClientBanque> clients() {
		return clientService.findAll();
	}

	@GetMapping("/clients/search")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public List<ClientBanque> searchClients(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
		return clientService.searchClient(keyword);
	}

	@GetMapping("/clients/{id}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ClientBanque getClientById(@PathVariable(name = "id") Long clientId) throws ClientNotFoundException {
		return clientService.getById(clientId);
	}

	@PostMapping("/clients/add")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ClientBanque saveClient(@RequestBody ClientBanque client) {
		return clientService.saveOrUpdate(client);
	}

	@GetMapping("/clients/{id}/edit")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ClientBanque getClientForEdit(@PathVariable("id") Long clientId) throws ClientNotFoundException {
		return clientService.getById(clientId);
	}

	@PutMapping("/clients/{id}")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ClientBanque updateClient(@PathVariable("id") Long clientId, @RequestBody ClientBanque updatedClient)
			throws ClientNotFoundException {
		ClientBanque existingClient = clientService.getById(clientId);
		existingClient.setNom(updatedClient.getNom());
		existingClient.setEmail(updatedClient.getEmail());
		return clientService.saveOrUpdate(existingClient);
	}

	@DeleteMapping("/clients/{id}")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
		try {
			clientService.delete(id); 
			return ResponseEntity.ok().build(); 
		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build(); 
																		
		}
	}

	@GetMapping("/clients/{id}/comptes")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public List<CompteBancaire> getClientComptes(@PathVariable Long id) {
		return clientService.getComptesByClientId(id);
	}
}
