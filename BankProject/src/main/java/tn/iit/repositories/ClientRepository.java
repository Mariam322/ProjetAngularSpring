package tn.iit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.iit.entites.ClientBanque;

public interface ClientRepository extends JpaRepository<ClientBanque, Long> {
	//HQL
	@Query("select c from ClientBanque c where c.nom like :kw")
	List<ClientBanque> searchClient(@Param("kw")String keyword);}
