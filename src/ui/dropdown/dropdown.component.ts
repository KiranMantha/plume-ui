import { Component, html, Renderer } from '@plumejs/core';
import dropdownStyles from './dropdown.component.scss';
import { IDropdownOptions, IOption } from './dropdown.interface';

const defaultDropdownOptions: IDropdownOptions<any> = {
  options: [],
  multiple: false,
  defaultText: 'Select',
  buttonText: null,
  enableFilter: false,
  disable: false,
  resetDropdown: false
};

@Component({
  selector: 'ui-dropdown',
  styles: dropdownStyles
})
export class DropdownComponent<T> {
  readonly ObservedProperties = <const>['dropdownOptions'];

  dropdownOptions: IDropdownOptions<T> = { ...defaultDropdownOptions };
  private _detailsNode: HTMLElement;
  private _summaryNode: HTMLElement;
  private _optionsContainerNode: HTMLElement;
  private _summaryText: string;
  private _isMultiSelect = false;
  private _selectedOptions = [];

  constructor(private renderer: Renderer) {}

  onPropsChanged() {
    if (this.dropdownOptions.options.length) {
      this.dropdownOptions = {
        ...defaultDropdownOptions,
        ...this.dropdownOptions
      };
      const { multiple, resetDropdown } = this.dropdownOptions;
      if (!!resetDropdown) {
        this._selectedOptions = [];
        this.dropdownOptions.options = this.dropdownOptions.options.map((option) => {
          option.selected = false;
          return option;
        });
      }
      this._isMultiSelect = multiple;
      this._getSummaryText();
    }
  }

  onOptionSelected(isChecked: boolean, selectedOption: IOption<T>, index: number) {
    let selectedText = '';

    if (!this._isMultiSelect) {
      //get button text
      selectedText = selectedOption.label;
      this._detailsNode.removeAttribute('open');
    } else {
      // update selected options
      this.dropdownOptions.options[index].selected = isChecked;
      this._selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);

      //get button text
      if (this.dropdownOptions.buttonText) {
        selectedText = this.dropdownOptions.buttonText(this._selectedOptions);
      } else if (this._selectedOptions.length) {
        selectedText = this._selectedOptions.map((item) => item.label).join(', ');
      } else {
        selectedText = this.dropdownOptions.defaultText;
      }
    }

    //set button text and emit selected options
    this._summaryNode.textContent = selectedText;
    this.renderer.emitEvent('optionselected', {
      option: !this._isMultiSelect ? selectedOption : this._selectedOptions
    });
  }

  _getSummaryText() {
    this._selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
    if (this._isMultiSelect) {
      this._summaryText = this._selectedOptions.map((item) => item.label).join(',') || this.dropdownOptions.defaultText;
    } else {
      if (this._selectedOptions.length) {
        this._summaryText = this._selectedOptions[0].label;
      } else {
        this.dropdownOptions.options[0].selected = true;
        this._summaryText = this.dropdownOptions.options[0].label;
      }
    }
  }

  _buildItems() {
    const items = this.dropdownOptions.options.map((item, index) => {
      return html`
        <li>
          <input
            name="select"
            id="id-${index}"
            type="${this._isMultiSelect ? 'checkbox' : 'radio'}"
            checked=${!!item.selected}
            onchange=${(e) => {
              this.onOptionSelected(e.target.checked, item, index);
            }}
          />
          <label for="id-${index}"> ${item.label} </label>
        </li>
      `;
    });
    if (this.dropdownOptions.enableFilter) {
      const filterNode = html` <li class="filter">
        <input
          type="search"
          oninput=${(e) => {
            this._filterList(e.target.value);
          }}
        />
      </li>`;
      items.unshift(filterNode);
    }
    return items;
  }

  _filterList(filterText: string) {
    const labels = this._optionsContainerNode.querySelectorAll('label');
    Array.from(labels).forEach((element: HTMLLabelElement) => {
      const itemText = element.textContent || element.innerText;
      if (filterText) {
        if (itemText.toLowerCase().indexOf(filterText) !== -1) {
          element.parentElement.classList.remove('hide-item');
        } else {
          element.parentElement.classList.add('hide-item');
        }
      } else {
        element.parentElement.classList.remove('hide-item');
      }
    });
  }

  render() {
    if (this.dropdownOptions.options.length) {
      return html`
        <details
          role="list"
          part="list"
          class="${this.dropdownOptions.disable ? 'disabled' : ''}"
          ref=${(node) => {
            this._detailsNode = node;
          }}
        >
          <summary
            aria-haspopup="listbox"
            ref=${(node) => {
              this._summaryNode = node;
            }}
          >
            ${this._summaryText}
          </summary>
          <ul
            role="listbox"
            ref=${(node) => {
              this._optionsContainerNode = node;
            }}
          >
            ${this._buildItems()}
          </ul>
        </details>
      `;
    } else {
      return html`<div></div>`;
    }
  }
}