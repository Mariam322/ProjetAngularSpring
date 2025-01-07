package tn.iit.controller;

import java.util.List;

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
import tn.iit.entites.CompteBancaire;
import tn.iit.exception.ClientNotFoundException;
import tn.iit.exception.CompteNotFoundException;
import tn.iit.services.CompteService;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CompteRestController {
	// on a best=oin d'utiliser la couche service parceque le controlleur communique
	// uniquement avec couche service
	private final CompteService compteService;
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	@GetMapping("/comptes")
	public List<CompteBancaire> comptes() {
		return compteService.findAll();
	}
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	// on a utilise des exceptions surveilles
	@GetMapping("/comptes/{rib}")
	public CompteBancaire getCompteByRib(@PathVariable(name = "rib") Long rib) throws CompteNotFoundException {
		return compteService.getById(rib);
	}
	@DeleteMapping("/comptes/delete/{rib}")
	public void deleteCompteClientC(@PathVariable("rib") Long rib) throws CompteNotFoundException {
	    compteService.deleteCompteByRib(rib);
	}
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	@PostMapping("/comptes/add")
	public CompteBancaire saveCompte(@RequestBody CompteBancaire compte) {

		return compteService.saveOrUpdate(compte);

	}
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	@GetMapping("/comptes/{id}/edit")
	public CompteBancaire getClientForEdit(@PathVariable("rib") Long rib) throws CompteNotFoundException {
		// Récupérer le client par son ID
		return compteService.getById(rib);
	}

	// Endpoint pour débiter un compte
	@PutMapping("/comptes/{rib}/debiter")
	public void debiterCompte(@PathVariable("rib") Long rib, @RequestParam double montant)
			throws CompteNotFoundException {
		log.info("Debiting account with RIB: " + rib + " by amount: " + montant);
		compteService.debiter(rib, montant);
	}

	// Endpoint pour créditer un compte
	@PutMapping("/comptes/{rib}/crediter")
	public void crediterCompte(@PathVariable("rib") Long rib, @RequestParam double montant)
			throws CompteNotFoundException {
		log.info("Crediting account with RIB: " + rib + " by amount: " + montant);
		compteService.crediter(rib, montant);
	}
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	@PostMapping("/clients/{id}/comptes")
	public CompteBancaire saveCompteBancaireForClient(
	        @PathVariable("id") Long id, 
	        @RequestBody CompteBancaire compteBancaire) throws ClientNotFoundException {
	    
	    log.info("Creating account for client with ID: " + id);
	    return compteService.saveCompteBancaireByIdClient(id, compteBancaire);
	}
	/*@GetMapping("/comptes/{rib}/list")
	public List<CompteBancaire> getAccounts(
	        @PathVariable Long rib,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "5") int size) {
	    return compteService.getAccountList(rib, page, size);
	}*/
	/*@GetMapping("/clients/{id}/comptes")
    public List<CompteBancaire> getComptesByClientId(@PathVariable("id") Long id) {
        log.info("Fetching accounts for client with ID: " + id);
        return compteService.getComptesByClientId(id);
    }*/
	
	@PutMapping("/comptes/{rib}")
    public CompteBancaire updateCompte(@PathVariable("rib") Long rib, @RequestBody CompteBancaire updatedCompte) throws CompteNotFoundException {
        CompteBancaire existingCompte = compteService.getById(rib);
        existingCompte.setSolde(updatedCompte.getSolde());
        existingCompte.setCreatedAt(updatedCompte.getCreatedAt());
        return compteService.saveOrUpdate(existingCompte);
    }
	 @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	    @GetMapping("/clients/{clientId}/comptes")
	    public List<CompteBancaire> getComptesByClientId(@PathVariable("clientId") Long clientId) throws ClientNotFoundException {
	        log.info("Fetching accounts for client with ID: " + clientId);
	        return compteService.getComptesByClientId(clientId);
	    }

}
