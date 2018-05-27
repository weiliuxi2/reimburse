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
import com.wlx.reimburse.facade.BigTypeFacade;
import com.wlx.reimburse.model.BigTypeVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/types/bigTypes")
public class BigTypeController {

	@Autowired
	private BigTypeFacade bigTypeFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody BigTypeVO bigTypeVO){
		return new RestfulResponse<Boolean>(bigTypeFacade.save(bigTypeVO));
	}
	
	@PutMapping
	public RestfulResponse<Void> update(@RequestBody BigTypeVO bigTypeVO){
		bigTypeFacade.update(bigTypeVO);
		return new RestfulResponse<>();
	}
	
	@GetMapping
	public RestfulResponse<List<BigTypeVO>> queryTypes(){
		RestfulResponse<List<BigTypeVO>> response = new RestfulResponse<>();
		response.setData(bigTypeFacade.query());;
		return response;
	}
	
	@DeleteMapping(value = "{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		bigTypeFacade.delete(id);
		return new RestfulResponse<>();
	}
}
