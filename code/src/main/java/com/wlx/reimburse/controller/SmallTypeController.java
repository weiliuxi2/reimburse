package com.wlx.reimburse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wlx.reimburse.common.RestfulResponse;
import com.wlx.reimburse.facade.SmallTypeFacade;
import com.wlx.reimburse.model.SmallTypeVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/types/smallTypes")
public class SmallTypeController {

	@Autowired
	private SmallTypeFacade smallTypeFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody SmallTypeVO vo){
		return new RestfulResponse<Boolean>(smallTypeFacade.save(vo));
	}
	
	@PutMapping
	public RestfulResponse<Void> update(@RequestBody SmallTypeVO vo){
		smallTypeFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@GetMapping
	public RestfulResponse<List<SmallTypeVO>> queryTypes(){
		RestfulResponse<List<SmallTypeVO>> response = new RestfulResponse<>();
		response.setData(smallTypeFacade.query());;
		return response;
	}
	
	@DeleteMapping(value = "{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		smallTypeFacade.delete(id);
		return new RestfulResponse<>();
	}
}
