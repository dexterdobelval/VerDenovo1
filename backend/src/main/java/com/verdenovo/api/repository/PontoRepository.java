package com.verdenovo.api.repository;

import com.verdenovo.api.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
    List<Ponto> findByStatusPonto(String statusPonto);
    Optional<Ponto> findByEmailAndStatusPonto(String email, String statusPonto);
}