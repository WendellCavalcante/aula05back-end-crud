package com.spring_boot_java.estoquesapi.controler;

import com.spring_boot_java.estoquesapi.model.Estoque;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("estoques")
public class EstoqueControle {

    @PostMapping
    public void salvar(@RequestBody Estoque estoque){
        System.out.println("Estoque recebido: "+estoque);
    }
}
