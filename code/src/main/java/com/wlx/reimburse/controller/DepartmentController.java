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
import com.wlx.reimburse.facade.DepartmentFacade;
import com.wlx.reimburse.model.DepartmentVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/departments")
public class DepartmentController {

	@Autowired
	private DepartmentFacade departmentFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody DepartmentVO vo){
		return new RestfulResponse<Boolean>(departmentFacade.save(vo));
	}
	
	@PutMapping
	public RestfulResponse<Void> update(@RequestBody DepartmentVO vo){
		departmentFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@GetMapping
	public RestfulResponse<List<DepartmentVO>> queryTypes(){
		RestfulResponse<List<DepartmentVO>> response = new RestfulResponse<>();
		response.setData(departmentFacade.query());;
		return response;
	}
	
	@DeleteMapping(value = "{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		departmentFacade.delete(id);
		return new RestfulResponse<>();
	}
}
