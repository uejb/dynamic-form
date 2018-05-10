import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSlideToggle} from '@angular/material';
import {By} from '@angular/platform-browser';

import {DynamicFormModule} from '../dynamic_form_module';
import {Entity, Prop} from '../meta_datamodel';
import {DynamicFieldPropertyComponent} from '../prop_component';
import {EntityMetaDataRepository} from '../repositories';

/**
 * Host component to test prop_component.ts
 */
@Component({
  template: `
  <form >
    <gdf-prop [prop]="prop" [inst]="inst"></gdf-prop>
  </form>
  `
})
export class TestHostComponent {
  prop: Prop;
  // tslint:disable-next-line:no-any property value can be anything
  inst: {[index: string]: any};
  @ViewChild(DynamicFieldPropertyComponent)
  propComp: DynamicFieldPropertyComponent;


  constructor() {}
}

describe('BooleanInput', () => {

  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  const entity = new Entity('test', [new Prop({
                              name: 'prop1',
                              type: 'checkbox',
                              controlType: 'boolean',
                              dataType: 'BOOLEAN',
                              label: 'first Property',
                            })]);

  // configure
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormModule],
      declarations: [TestHostComponent],
    });

    // initialize meta data
    TestBed.get(EntityMetaDataRepository).registerMetaData(entity);
    fixture = TestBed.createComponent(TestHostComponent);

    comp = fixture.componentInstance;
    comp.prop = entity.props[0];
    comp.inst = {prop1: true};
    fixture.detectChanges();
  });


  it('valueIsShown', () => {
    // query for the title <h1> by CSS element selector
    const de = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(de).not.toBeNull();
    const toggler = de.componentInstance as MatSlideToggle;
    expect(toggler.checked).toBeTruthy();
  });

  it('toggle', () => {
    // query for the title <h1> by CSS element selector
    const de = fixture.debugElement.query(By.css('mat-slide-toggle'));

    const toggler = de.componentInstance as MatSlideToggle;
    fixture.debugElement.query(By.css('input')).nativeElement.click();
    expect(toggler.checked).not.toBeTruthy();
  });


});