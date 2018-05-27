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
import com.wlx.reimburse.facade.ProjectFacade;
import com.wlx.reimburse.model.ProjectVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/projects")
public class ProjectController {

	@Autowired
	private ProjectFacade projectFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody ProjectVO vo){
		return new RestfulResponse<Boolean>(projectFacade.save(vo));
	}
	
	@PutMapping
	public RestfulResponse<Void> update(@RequestBody ProjectVO vo){
		projectFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@GetMapping
	public RestfulResponse<List<ProjectVO>> queryTypes(){
		RestfulResponse<List<ProjectVO>> response = new RestfulResponse<>();
		response.setData(projectFacade.query());;
		return response;
	}
	
	@DeleteMapping(value = "{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		projectFacade.delete(id);
		return new RestfulResponse<>();
	}
}
