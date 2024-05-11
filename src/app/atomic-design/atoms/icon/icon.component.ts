import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'atom-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() iconName: string = '';
  @Input() isIconButtom: boolean = false;
  @Input() classIcon: string = '';
  svgContent: SafeHtml | undefined;

  constructor( private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadSVG();
  }

  loadSVG() {
    const svgPath = this.iconName;
    fetch(svgPath).then((response) => {
      return response.text();
    }).then((data) => {
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconName'] && !changes['iconName'].firstChange) {
      this.loadSVG();
    }
  }
}
