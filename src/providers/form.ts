export class Form {

  static convert(body: any): FormData {

    body = Form.convertToLinearObject(body);

    let form = new FormData();

    Object.keys(body).forEach(field => {
      form.append(field, body[field]);
    });

    return form;
  }

  static convertToLinearObject(model: any, form: any = null, namespace = null) {

    form = form || {};

    for (let propertyName in model) {

      if (!model.hasOwnProperty(propertyName) || model[propertyName] == undefined) {
        continue;
      }

      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

      if (model[propertyName] instanceof Date) {

        form[formKey] = model[propertyName];
      } else if (model[propertyName] instanceof Array) {

        model[propertyName].forEach((element, index) => {

          if (typeof element != 'object' || element instanceof File) {

            form[`${formKey}[${index}]`] = element;
          } else {
            Form.convertToLinearObject(element, form, `${formKey}[${index}]`);
          }
        });
      } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {

        Form.convertToLinearObject(model[propertyName], form, formKey);
      } else {
        form[formKey] = model[propertyName].toString();
      }
    }
    return form;
  }
}
