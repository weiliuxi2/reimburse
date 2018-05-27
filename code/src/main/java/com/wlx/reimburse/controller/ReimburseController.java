package com.wlx.reimburse.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
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

import com.wlx.reimburse.common.Paging;
import com.wlx.reimburse.common.RestfulResponse;
import com.wlx.reimburse.dto.ReimburseDTO;
import com.wlx.reimburse.facade.ReimburseBaseFacade;
import com.wlx.reimburse.facade.ReimburseDetailFacade;
import com.wlx.reimburse.facade.ReimburseFacade;
import com.wlx.reimburse.model.ReimburseBaseVO;
import com.wlx.reimburse.model.ReimburseDetailVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1/reimburses")
public class ReimburseController {

	@Autowired
	private ReimburseBaseFacade reimburseBaseFacade;
	

	@Autowired
	private ReimburseDetailFacade reimburseDetailFacade;
	
	@Autowired
	private ReimburseFacade reimburseFacade;
	
	@PostMapping
	public RestfulResponse<Boolean> save(@RequestBody ReimburseDTO dto){
		return new RestfulResponse<Boolean>(reimburseFacade.save(dto));
	}
	
	@DeleteMapping(value = "{danHao}")
	public RestfulResponse<Boolean> save(@PathVariable String danHao){
		return new RestfulResponse<Boolean>(reimburseFacade.delete(danHao));
	}
	
	@GetMapping(value = "{danHao}")
	public RestfulResponse<ReimburseDTO> get(@PathVariable String danHao){
		return new RestfulResponse<ReimburseDTO>(reimburseFacade.get(danHao));
	}
	
	@PutMapping
	public RestfulResponse<Boolean> update(@RequestBody ReimburseDTO dto){
		return new RestfulResponse<Boolean>(reimburseFacade.update(dto));
	}
	
	@GetMapping(value = "/bases")
	public RestfulResponse<Paging<ReimburseBaseVO>> query(@RequestParam(required = false) String userName,@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam(required = false) String departmentId){
		RestfulResponse<Paging<ReimburseBaseVO>> response = new RestfulResponse<>();
		Paging<ReimburseBaseVO> paging = new Paging<>();
		ReimburseBaseVO vo = new ReimburseBaseVO();
		vo.setEmploymentName(userName);
		if (StringUtils.isNotEmpty(departmentId)) {
			vo.setDepartmentId(Integer.valueOf(departmentId));
		}
		vo.setPageNo((pageNo - 1) * pageSize);
		vo.setPageSize(pageSize);
		List<ReimburseBaseVO> byVO = reimburseBaseFacade.getByVO(vo);
		paging.setT(byVO);
		paging.setTotal(reimburseBaseFacade.getSizeByVO(vo));
		response.setData(paging);
		return response;
	}
	
	@PostMapping(value = "/bases")
	public RestfulResponse<Boolean> save(@RequestBody ReimburseBaseVO vo){
		reimburseBaseFacade.save(vo);
		return new RestfulResponse<Boolean>(true);
	}
	
	@PutMapping(value = "/bases")
	public RestfulResponse<Void> update(@RequestBody ReimburseBaseVO vo){
		reimburseBaseFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@DeleteMapping(value = "/bases/{id}")
	public RestfulResponse<Void> delete(@PathVariable int id){
		reimburseBaseFacade.delete(id);
		return new RestfulResponse<>();
	}
	
	
	
	
	@GetMapping(value = "/details")
	public RestfulResponse<List<ReimburseDetailVO>> query2detail(){
		RestfulResponse<List<ReimburseDetailVO>> response = new RestfulResponse<>();
		response.setData(reimburseDetailFacade.query());;
		return response;
	}
	
	
	@PostMapping(value = "/details")
	public RestfulResponse<Boolean> save2detail(@RequestBody ReimburseDetailVO vo){
		return new RestfulResponse<Boolean>(reimburseDetailFacade.save(vo));
	}
	
	@PutMapping(value = "/details")
	public RestfulResponse<Void> update2detail(@RequestBody ReimburseDetailVO vo){
		reimburseDetailFacade.update(vo);
		return new RestfulResponse<>();
	}
	
	@DeleteMapping(value = "/details/{id}")
	public RestfulResponse<Void> delete2detail(@PathVariable int id){
		reimburseDetailFacade.delete(id);
		return new RestfulResponse<>();
	}
}
