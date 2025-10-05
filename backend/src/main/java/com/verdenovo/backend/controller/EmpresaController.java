package com.verdenovo.backend.controller;

import com.verdenovo.backend.entity.Empresa;
import com.verdenovo.backend.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public List<Empresa> listarTodas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/ativas")
    public List<Empresa> listarAtivas() {
        return empresaRepository.findByAtivoTrue();
    }

    @PostMapping
    public Empresa criar(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PostMapping("/login")
    public ResponseEntity<Empresa> login(@RequestBody Empresa loginData) {
        Optional<Empresa> empresa = empresaRepository.findByEmailAndSenha(loginData.getEmail(), loginData.getSenha());
        if (empresa.isPresent() && empresa.get().getAtivo()) {
            return ResponseEntity.ok(empresa.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> atualizar(@PathVariable Long id, @RequestBody Empresa empresaAtualizada) {
        Optional<Empresa> empresaExistente = empresaRepository.findById(id);
        if (empresaExistente.isPresent()) {
            Empresa empresa = empresaExistente.get();
            empresa.setNome(empresaAtualizada.getNome());
            empresa.setNomeEmpresa(empresaAtualizada.getNomeEmpresa());
            empresa.setCnpj(empresaAtualizada.getCnpj());
            empresa.setEmail(empresaAtualizada.getEmail());
            if (empresaAtualizada.getSenha() != null) {
                empresa.setSenha(empresaAtualizada.getSenha());
            }
            empresa.setTelefone(empresaAtualizada.getTelefone());
            empresa.setEndereco(empresaAtualizada.getEndereco());
            empresa.setCidade(empresaAtualizada.getCidade());
            empresa.setCep(empresaAtualizada.getCep());
            empresa.setSetor(empresaAtualizada.getSetor());
            empresa.setDescricao(empresaAtualizada.getDescricao());
            empresa.setHorario(empresaAtualizada.getHorario());
            empresa.setImagemEmpresa(empresaAtualizada.getImagemEmpresa());
            empresa.setAtivo(empresaAtualizada.getAtivo());
            return ResponseEntity.ok(empresaRepository.save(empresa));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}