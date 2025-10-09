package com.verdenovo.api.repository;

import com.verdenovo.api.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByStatusCategoria(String statusCategoria);
}