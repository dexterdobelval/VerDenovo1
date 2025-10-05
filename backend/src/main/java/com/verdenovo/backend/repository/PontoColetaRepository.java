package com.verdenovo.backend.repository;

import com.verdenovo.backend.entity.PontoColeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface PontoColetaRepository extends JpaRepository<PontoColeta, Long> {
    Optional<PontoColeta> findByEmail(String email);
    Optional<PontoColeta> findByEmailAndSenha(String email, String senha);
    Optional<PontoColeta> findByCodigo(String codigo);
    List<PontoColeta> findByAtivoTrue();
}