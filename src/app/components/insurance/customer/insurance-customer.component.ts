import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService} from '../../../services/base.service';

declare var $:any;
declare var window:any;

@Component({
  selector: 'insurance-customer-component',
  templateUrl: './insurance-customer.component.html',
  styleUrls: ['../../share/css/base-panel.scss']
})

export class InsuranceCustomerComponent implements OnInit {
  isLoading:any = false;
  userInfo:any;
  companies:any = [];
  users:any = [];
  deletingObject:any;
  deletingType:any;
  deletingObjectIndex:any;
  deletingParentObject:any;
  confirmation:any = {
    btnLeftText: 'Yes',
    btnRightText: 'No',
    title: 'Confirmation',
    content: 'Are you sure you want to delete this?',
  };
  headerConfig:any = {
    menuLeft: true,
    loggedIn: true
  };
  newCompany:any = {};

  constructor(private _router: Router,  private _baseService: BaseService){

  }

  ngOnInit(){
    var self = this;
    self.companies = [];
    var userInfo = sessionStorage.getItem('UserInfo');
    if (userInfo && userInfo != 'undefined' && userInfo != 'null'){
      self.userInfo = JSON.parse(userInfo);
      self.isLoading = true;
      self._baseService.getBase('api/InsuranceCompany/GetAll').then((res:any) => {
        if (res && res.ok != false) {
          self.companies = res;
        }
        self.isLoading = false;
      });
      self._baseService.getBase('api/Person').then((res:any) => {
        if (res && res.ok != false) {
          self.users = res;
        }
      });
    } else {
      self._router.navigate(['/login']);
    }
  }

  btnDeleteClick(deletingObject, deletingType, index, deletingParentObject) {
    this.deletingObject = deletingObject;
    this.deletingObjectIndex = index;
    this.deletingType = deletingType;
    this.deletingParentObject = deletingParentObject;
    $("#confirmation_modal").modal('show');
  }

  btnConfirmDeletingClick(event) {
    var self = this;
    if ($(event.target).attr('class').indexOf('btn-loading') >= 0) {
      return;
    }
    $(event.target).addClass('btn-loading');
    var url:any = "";
    if (self.deletingType == 'product') {
      url = 'api/InsuranceCompany/' + self.deletingParentObject.Soid + '/DeleteProduct/' + self.deletingObject.Soid;
    } else if (self.deletingType == 'company') {
      url = 'api/InsuranceCompany/' + self.deletingObject.Soid;
    }

    self._baseService.deleteBase(url).then((res)=>{
      if (self.deletingType == 'product') {
        self.companies[self.deletingObjectIndex].Products = res.Products;
      } else if (self.deletingType == 'company') {
        self.companies.splice(self.deletingObjectIndex, 1);
      }
      $("#confirmation_modal").modal('hide');
      $(event.target).removeClass('btn-loading');
    });
  }

  btnConfirmCancelingClick() {
    $("#confirmation_modal").modal('hide');
  }

  btnAddCompanyProductClick(event, company) {
    var self = this;
    if ($(event.target).attr('class').indexOf('btn-loading') >= 0) {
      return;
    }
    $(event.target).addClass('btn-loading');
    var url:any = 'api/InsuranceCompany/' + company.Soid + '/AddProduct';
    self._baseService.postBase(url, {}).then((res:any) => {
      if (res) {
        company.Products = res.Products;
      } else {
        $(event.target).removeClass('btn-loading');
        window.showError();
      }
      $(event.target).removeClass('btn-loading');
    });
  }

  txtValueChange(event, type, fieldName, editingObject, parentObject:any = {}) {
    var self = this;
    var value:any = '';
    var boolInputFields = ['Taxable', 'Active'];
    if (boolInputFields.indexOf(fieldName) >= 0) {
      value = $(event.target).prop('checked');
    } else {
      value = $(event.target).val().trim();
    }

    var data = {
      FieldName: fieldName,
      Data: value
    };

    if (fieldName.indexOf('.') >= 0) {
      data.FieldName = fieldName.split('.')[0];
      data.Data = editingObject[data.FieldName];
      data.Data[fieldName.split('.')[1]] = value;
    }

    var url;
    if (type == 'company') {
      url = 'api/InsuranceCompany/' + editingObject.Soid;
    } else if (type == 'product') {
      url = 'api/InsuranceCompany/' + parentObject.Soid + '/UpdateProduct/' + editingObject.Soid;
    }
    self._baseService.patchBase(url, data).then((res) => {
      if (res.Changed) {
        if (boolInputFields.indexOf(fieldName) >= 0) {
          var checked = (res.Data == 'true');
          $(event.target).prop( "checked", checked );
        } else {
          $(event.target).val(res.Data);
        }
      } else {
        if (!res.Value)
          res.Value = '';

        var dateFieldNames = ['BusinessStartDate'];
        if (dateFieldNames.indexOf(fieldName) >= 0 && !isNaN(Date.parse(res.Value))) {
          res.Value = window.getDateInputFormat(res.Value);
        }
        $(event.target).val(res.Value);
      }
    });
  }
}
