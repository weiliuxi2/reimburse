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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wlx.reimburse.common.RestfulResponse;
import com.wlx.reimburse.facade.EmploymentFacade;
import com.wlx.reimburse.model.EmploymentVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/employments")
public class EmploymentController {

	@Autowired
	private EmploymentFacade employmentFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody EmploymentVO vo){
		vo.setPassword("88888888");
		return new RestfulResponse<Boolean>(employmentFacade.save(vo));
	}
	
	@PutMapping
	public RestfulResponse<Void> update(@RequestBody EmploymentVO vo){
		employmentFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@GetMapping
	public RestfulResponse<List<EmploymentVO>> query(){
		RestfulResponse<List<EmploymentVO>> response = new RestfulResponse<>();
		response.setData(employmentFacade.query());;
		return response;
	}
	
	@DeleteMapping(value = "{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		employmentFacade.delete(id);
		return new RestfulResponse<>();
	}
	
	@GetMapping(value = "{id}")
	public RestfulResponse<EmploymentVO> getEmploymentInfo(@PathVariable int id){
		EmploymentVO employment = new EmploymentVO();
		employment.setId(id);
		employment.setPassword(null);
		return new RestfulResponse<EmploymentVO>(employmentFacade.queryOneByVO(employment));
	}
	
	@PostMapping(value = "/password")
	public RestfulResponse<Boolean> updatePassword(@RequestBody EmploymentVO employment ){
		return new RestfulResponse<Boolean>(employmentFacade.updatePassword(employment));
	}
}
