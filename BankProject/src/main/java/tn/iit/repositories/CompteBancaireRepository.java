package tn.iit.repositories;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import tn.iit.entites.CompteBancaire;

public interface CompteBancaireRepository extends JpaRepository<CompteBancaire, Long> {
	/* Page<CompteBancaire> findByRib(Long rib, Pageable pageable);*/

	List<CompteBancaire> findByClientBanque_Id(Long clientId);
}

