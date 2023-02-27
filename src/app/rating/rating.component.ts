import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  onChange: (rating: number) => void = () => {};
  onTouched: () => void = () => {};
  disabled = false;
  writeValue(rating: number): void {
    this.rating = rating;
    this.onChange(rating);
  }
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  stars: number = 10;
  maxRating = Array(this.stars);
  rating: number = 3;
  private _hoveredIndex = -1;
  enter(index: number) {
    this._hoveredIndex = index;
  }
  leave(index: number) {
    this._hoveredIndex = -1;
  }
  select(index: number) {
    this.rating = index + 1;
    this.onChange(this.rating);
    this.leave(index);
  }
  getStarClass(index: number) {
    if (this._hoveredIndex >= index) {
      return {
        active: true,
        hovered: true,
      };
    }
    if (index < this.rating && this._hoveredIndex == -1) {
      return {
        active: true,
      };
    }
    return {};
  }
  isHovered(index: number) {
    return this._hoveredIndex === index;
  }
}
