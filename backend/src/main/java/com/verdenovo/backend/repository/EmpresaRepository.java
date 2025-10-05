package com.verdenovo.backend.repository;

import com.verdenovo.backend.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByEmail(String email);
    Optional<Empresa> findByEmailAndSenha(String email, String senha);
    List<Empresa> findByAtivoTrue();
}